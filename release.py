import subprocess
import re

regex = r"--------------((.|\n)*)--------------"

# run `npx changelogithub --dry` and capture the output
output = subprocess.check_output(["pnpm", "dlx", "changelogithub@0.12", "--dry"], shell=True)
# convert output to string
output = output.decode("utf-8")

# use regex to extract
matches = re.findall(regex, output, re.MULTILINE)

content = matches[0] + """

[Origin Repo](https://github.com/InEase/My-SiYuan-Plugins)

"""
print(content)
