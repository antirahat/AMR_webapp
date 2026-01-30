from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
import sqlite3
import os

DATABASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'amr.db')

class LoginForm(FlaskForm):
    """Login form with email and password"""
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Login')
    
    def validate_email(self, email):
        """Check if email exists in database"""
        try:
            conn = sqlite3.connect(DATABASE)
            curs = conn.cursor()
            curs.execute("SELECT email FROM users WHERE email = ?", [email.data])
            valemail = curs.fetchone()
            conn.close()
            if valemail is None:
                raise ValidationError('This email is not registered. Please register first.')
        except sqlite3.OperationalError:
            # Database or table doesn't exist yet
            raise ValidationError('No users registered yet. Please register first.')

class RegistrationForm(FlaskForm):
    """Registration form with name, email, password"""
    name = StringField('Full Name', validators=[DataRequired(), Length(min=2, max=50)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired(), Length(min=6)])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Create Account')
    
    def validate_email(self, email):
        """Check if email is already registered"""
        try:
            conn = sqlite3.connect(DATABASE)
            curs = conn.cursor()
            curs.execute("SELECT email FROM users WHERE email = ?", [email.data])
            valemail = curs.fetchone()
            conn.close()
            if valemail:
                raise ValidationError('This email is already registered. Please login.')
        except sqlite3.OperationalError:
            # Database or table doesn't exist yet - that's fine for registration
            pass
