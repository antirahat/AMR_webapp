from flask import Flask, render_template, url_for, flash, request, redirect
import sqlite3
import os
from flask_login import LoginManager, UserMixin, login_required, login_user, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from forms import LoginForm, RegistrationForm

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-change-in-production'
app.debug = True

# Initialize Flask-Login
login_manager = LoginManager(app)
login_manager.login_view = "login"
login_manager.login_message_category = "info"

# Database path
DATABASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'amr.db')

def get_db():
    """Connect to SQLite database"""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Initialize the database with users table"""
    conn = get_db()
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users(
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )''')
    conn.commit()
    conn.close()

# User class for Flask-Login
class User(UserMixin):
    def __init__(self, id, name, email, password):
        self.id = id
        self.name = name
        self.email = email
        self.password = password
        self.authenticated = False
    
    def is_active(self):
        return True
    
    def is_anonymous(self):
        return False
    
    def is_authenticated(self):
        return self.authenticated
    
    def get_id(self):
        return str(self.id)

@login_manager.user_loader
def load_user(user_id):
    """Load user from database by ID"""
    conn = get_db()
    curs = conn.cursor()
    curs.execute("SELECT * FROM users WHERE user_id = ?", [user_id])
    lu = curs.fetchone()
    conn.close()
    if lu is None:
        return None
    else:
        return User(int(lu['user_id']), lu['name'], lu['email'], lu['password'])

@app.route("/")
@login_required
def index():
    """Protected dashboard - requires login"""
    return render_template('dashboard.html', user=current_user)

@app.route("/login", methods=['GET', 'POST'])
def login():
    """Login page"""
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    form = LoginForm()
    if form.validate_on_submit():
        conn = get_db()
        curs = conn.cursor()
        curs.execute("SELECT * FROM users WHERE email = ?", [form.email.data])
        user = curs.fetchone()
        conn.close()
        
        if user and check_password_hash(user['password'], form.password.data):
            user_obj = User(int(user['user_id']), user['name'], user['email'], user['password'])
            login_user(user_obj, remember=form.remember.data)
            flash(f'Welcome back, {user["name"]}!', 'success')
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('index'))
        else:
            flash('Login unsuccessful. Please check email and password.', 'danger')
    
    return render_template('login.html', title='Login', form=form)

@app.route("/register", methods=['GET', 'POST'])
def register():
    """Registration page"""
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    
    form = RegistrationForm()
    if form.validate_on_submit():
        conn = get_db()
        curs = conn.cursor()
        
        # Check if email already exists
        curs.execute("SELECT email FROM users WHERE email = ?", [form.email.data])
        if curs.fetchone():
            flash('Email already registered. Please login.', 'warning')
            conn.close()
            return redirect(url_for('login'))
        
        # Hash password and insert user
        hashed_password = generate_password_hash(form.password.data)
        curs.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                     [form.name.data, form.email.data, hashed_password])
        conn.commit()
        conn.close()
        
        flash('Account created successfully! Please login.', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html', title='Register', form=form)

@app.route("/logout")
@login_required
def logout():
    """Logout user"""
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))

if __name__ == "__main__":
    init_db()  # Create database tables
    app.run(host='0.0.0.0', port=5000, debug=True)