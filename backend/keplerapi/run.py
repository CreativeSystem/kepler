import subprocess
import json
import sys

def main(argv):
  command = ''
  scripts = {}
  try:
    command = argv[0]
  except:
    assert "Command not supplied"
  try:
    with open('scripts.json') as json_file:
      scripts = json.load(json_file)
  except:
    assert "Error on load scripts.json"
  try:
    composed_command = scripts[command].split(' ')
  except:
    assert "Command not found"
  if(len(argv)> 1):
    composed_command+= argv[1:]
  print("running %s ...\n" % " ".join(composed_command))
  subprocess.run(composed_command)

if __name__ == "__main__":
  main(sys.argv[1:])