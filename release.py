import subprocess
import re

regex = r"--------------((.|\n)*)--------------"

# run `npx changelogithub --dry` and capture the output
output = subprocess.run(["npx", "--yes", "changelogithub@0.12", "--dry"], shell=True, capture_output=True).stdout
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