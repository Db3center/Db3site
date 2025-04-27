from flask import Flask, render_template
import os

app = Flask(__name__)

# Inicializando o contador de visitas
if not os.path.exists("contador.txt"):
    with open("contador.txt", "w") as f:
        f.write("0")

@app.route("/")
def index():
    # Lendo o contador de visitas
    with open("contador.txt", "r") as f:
        visitas = int(f.read())

    # Incrementando o contador de visitas
    visitas += 1

    # Salvando o novo valor no arquivo
    with open("contador.txt", "w") as f:
        f.write(str(visitas))

    return render_template("index.html", visitas=visitas)

if __name__ == "__main__":
    app.run(debug=True)
