from config import db
from sqlalchemy import Column, Integer, String

class Contact(db.Model):
    id = Column(Integer, primary_key=True)
    first_name = Column(String(80), unique=False, nullable=False)
    last_name = Column(String(80), unique=False, nullable=False)
    email = Column(String(120), unique=True, nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
        }