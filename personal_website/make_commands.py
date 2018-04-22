import shlex, os, subprocess

# Returns:
#   None if the process is running
#   A return code if the process is finished
def is_process_finished(process):
    return process.poll() is not None

def is_process_error(process):
    # Make sure poll() has been called first, or call it here
    return process.returncode is not 0

def execute_with_real_time_output(command, dir):
    os.chdir(dir)   #TODO make sure this succeeds?

    args = shlex.split(command)
    try:
        # Use Popen() - run() blocks until the subprocess is complete
        # Set universal_newlines so that stdout.readline() returns strings instead of byte literals (which must be decoded to utf-8 before printing)
        #TODO pipe stderr?
        # Set stdout=sys.stdout to print straight to the console.
        process = subprocess.Popen(args, stdout=subprocess.PIPE, universal_newlines=True)
    except FileNotFoundError:
        print('Command not found on system: {}'.format(args[0]))
        return None

    return process

# Blocks until the process finishes
# Sends output using the given send_output function.
# If the process was opened without stdout piped, this
# waits until the process finishes.
# Python will automatically send process output to the console.
def capture_process_output(process, send_output):
    output = None

    while True:
        if process.stdout:
            output = process.stdout.readline()

        if is_process_finished(process):
            if is_process_error(process):
                print('Command returned error: {}'.format(process.returncode))
            break

        if send_output and output:
            send_output(output.strip())

def make_default(dir, send_output=print):
    command = 'make CLICOLOR_FORCE=1'
    print('Executing command: {}'.format(command))
    process = execute_with_real_time_output(command, dir)
    if not process:
       return

    capture_process_output(process, send_output)

def make_clean(dir, send_output=print):
    command = 'make clean CLICOLOR_FORCE=1'
    print('Executing command: {}'.format(command))
    process = execute_with_real_time_output(command, dir)
    if not process:
        return

    capture_process_output(process, send_output)

def make_test(dir, send_output=print):
    command = 'make test CLICOLOR_FORCE=1'
    print('Executing command: {}'.format(command))
    process = execute_with_real_time_output(command, dir)
    if not process:
        return

    capture_process_output(process, send_output)
