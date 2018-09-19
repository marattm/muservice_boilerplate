# services/users/project/tests/test_user_model.py


import unittest

from sqlalchemy.exc import IntegrityError

from project import db
from project.api.models import User
from project.tests.base import BaseTestCase
from project.tests.utils import add_user, user_json, user2_json


class TestUserModel(BaseTestCase):

    def test_add_user(self):
        """Ensure add single user behaves correctly."""
        user = add_user(
            user_json()['username'],
            user_json()['email'],
            user_json()['password'])
        self.assertTrue(user.id)
        self.assertEqual(user.username, user_json()['username'])
        self.assertEqual(user.email, user_json()['email'])
        self.assertTrue(user.password)
        self.assertTrue(user.active)

    def test_add_user_duplicate_username(self):
        """Ensure error is thrown if the user already exists."""
        add_user(
            user_json()['username'],
            user_json()['email'],
            user_json()['password'])
        duplicate_user = User(
            user_json()['username'],
            user_json()['email'],
            user_json()['password']
        )
        db.session.add(duplicate_user)
        self.assertRaises(IntegrityError, db.session.commit)

    def test_add_user_duplicate_email(self):
        """Ensure error is thrown if the email already exists."""
        add_user(
            user_json()['username'],
            user_json()['email'],
            user_json()['password'])
        duplicate_user = User(
            user_json()['username'],
            user_json()['email'],
            user_json()['password']
        )
        db.session.add(duplicate_user)
        self.assertRaises(IntegrityError, db.session.commit)

    def test_to_json(self):
        """Ensure json is correctly generated."""
        user = add_user(
            user_json()['username'],
            user_json()['email'],
            user_json()['password'])
        self.assertTrue(isinstance(user.to_json(), dict))

    def test_passwords_are_random(self):
        """Ensure password are randomly generated for the same password."""
        user_one = add_user(
            user_json()['username'],
            user_json()['email'],
            user_json()['password'])
        user_two = add_user(
            user2_json()['username'],
            user2_json()['email'],
            user2_json()['password'])
        self.assertNotEqual(user_one.password, user_two.password)

    def test_encode_auth_token(self):
        """Ensure encode authentication is a byte."""
        user = add_user(
            user_json()['username'],
            user_json()['email'],
            user_json()['password'])
        auth_token = user.encode_auth_token(user.id)
        self.assertTrue(isinstance(auth_token, bytes))

    def test_decode_auth_token(self):
        """Ensure decode authentication work correctly."""
        user = add_user(
            user_json()['username'],
            user_json()['email'],
            user_json()['password'])
        auth_token = user.encode_auth_token(user.id)
        self.assertTrue(isinstance(auth_token, bytes))
        self.assertEqual(User.decode_auth_token(auth_token), user.id)


if __name__ == '__main__':
    unittest.main()
