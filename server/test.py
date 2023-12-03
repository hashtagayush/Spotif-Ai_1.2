import pandas as pd
import json

# Get the JSON argument passed from Node.js
json_str = input()

# Parse the JSON string into a Python dictionary
data = json.loads(json_str)

# Create a DataFrame from the dictionary
df = pd.DataFrame(data)

# Do some operations on the DataFrame if needed
# For example, print the first few rows
print(df.head().to_json(orient='records'))
df.head();
