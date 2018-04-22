import shlex, subprocess, os
import sys

# Returns:
#   None if the process is running
#   A return code if the process is finished
def is_process_finished(process):
    return process.poll() is not None

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

command = 'make CLICOLOR_FORCE=1'
args = shlex.split(command)
try:
    # Use Popen - run blocks until the subprocess is complete
    # This prints to the system console with color
    # process = subprocess.Popen(args, stdout=sys.stdout)
    # So does this??
    # process = subprocess.Popen(args)
    # This prints all output without color and with b''
    # process = subprocess.Popen(args, stdout=subprocess.PIPE)
    # Returns byte literals that must be decoded
    # process = subprocess.Popen(args, stdout=subprocess.PIPE)
    # Returns strings that can be printed directly.
    process = subprocess.Popen(args, stdout=subprocess.PIPE, universal_newlines=True)
except FileNotFoundError:
    print('file not found')
    exit()

while True:
    output = process.stdout.readline()
    if is_process_finished(process):
        if process.returncode is not 0:
            print('Process returned error: {}'.format(process.returncode))
        break
    if not output:
        continue

    if output:
        print(output.strip())
        # print(output.decode('utf-8').strip())




command = 'make test'
args = shlex.split(command)
try:
    # Use Popen - run blocks until the subprocess is complete
    process = subprocess.Popen(args, stdout=subprocess.PIPE, universal_newlines=True)
except FileNotFoundError:
    print('file not found')
    # stop

while True:
    output = process.stdout.readline()
    if is_process_finished(process):
        if process.returncode is not 0:
            print('Process returned error: {}'.format(process.returncode))
        break
    if not output:
        continue

    if output:
        print(output.strip())
