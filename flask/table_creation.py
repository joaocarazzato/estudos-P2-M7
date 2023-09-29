from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Results(db.Model):
        id = db.Column(db.Integer, primary_key=True)
        resultado = db.Column(db.Integer, nullable=False)

def create_table(app):

    with app.app_context():
        db.create_all()

def main():
    create_table()

if __name__ == "__main__":
    main()