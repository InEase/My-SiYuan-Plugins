import subprocess
import re

regex = r"--------------((.|\n)*)--------------"

# run `npx changelogithub --dry` and capture the output
process = subprocess.Popen(["npx", "--yes", "changelogithub", "--dry"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
output, error = process.communicate()
# convert output to string
output = output.decode("utf-8")

# use regex to extract, match only once
matches = re.search(regex, output, re.MULTILINE)

if not matches:
    raise Exception("No valid content found", output)

updates = matches[0].replace("--------------", "").strip()

content = updates + """

[Origin Repo](https://github.com/InEase/My-SiYuan-Plugins)

"""

print(content)