from flask import Flask
from flask import request
from flask import Response
from flask import g
from flask_cors import CORS, cross_origin
import sqlite3

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

DATABASE = './players.db'

@app.post('/insert')
@cross_origin()
def login_post():
    data = request.get_json(silent=True)
    player = {'fullname': data.get('fullname'), 'school': data.get('school'), 'grade': data.get('grade')}

    values = (player['fullname'], player['school'], player['grade'])


    conn = sqlite3.connect(DATABASE)
    sql = ''' INSERT INTO players (fullname, school, grade) VALUES (?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, values)
    conn.commit()
    cur.close()

    return Response("{'fullname':'%s','school':'%s''grade':'%s' }"%values, status=200, mimetype='application/json')

if __name__ == '__main__':
    app.run()