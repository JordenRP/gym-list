import json
from flask import Flask, jsonify, render_template, request
app = Flask(__name__)

@app.route('/')
def hello_world():
  return render_template('index.html')
 
@app.route('/add')
def add():
  exe = str(request.args.get('exe', ''))
  weidth = int(request.args.get('weidth', 0))
  rep = int(request.args.get('rep', 0))
  with open('log_exe.log', 'a') as log:
    print(exe, weidth, rep, file=log, sep='|')
  return jsonify({ 'exe':exe,
                   'weidth':weidth,
                   'rep':rep})

  
if __name__ == '__main__':
    app.run(debug=True)