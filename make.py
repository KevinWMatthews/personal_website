import shlex, subprocess, os

c_code_dir = '/home/kevin/coding/c/led_controller/build'
os.chdir(c_code_dir)

command = 'make clean'
args = shlex.split(command)
try:
    result = subprocess.run(args, stdout=subprocess.PIPE)
except FileNotFoundError:
    print('file not found')
    # stop

try:
    result.check_returncode()
except subprocess.CalledProcessError:
    print('error')

print(result)
print(result.stdout)

command = 'make'
args = shlex.split(command)
try:
    result = subprocess.run(args, stdout=subprocess.PIPE)
except FileNotFoundError:
    print('file not found')
    # stop

try:
    result.check_returncode()
except subprocess.CalledProcessError:
    print('error')

print(result)
print(result.stdout)
# for line in result.stdout:
    # print(line)
