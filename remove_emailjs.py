import os

# Set this to the path of your src directory
SRC_DIR = 'src'

# Terms to search for
search_terms = ['emailjs', 'emailjs-com']

# To automatically remove lines, set this to True
REMOVE_LINES = True

for root, dirs, files in os.walk(SRC_DIR):
    for file in files:
        if file.endswith(('.js', '.ts', '.tsx')):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                lines = f.readlines()
            found = False
            new_lines = []
            for line in lines:
                if any(term in line for term in search_terms):
                    print(f'Found in {file_path}: {line.strip()}')
                    found = True
                    if not REMOVE_LINES:
                        new_lines.append(line)
                else:
                    new_lines.append(line)
            if found and REMOVE_LINES:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.writelines(new_lines)
                print(f'Updated {file_path} (removed lines with EmailJS references)')
