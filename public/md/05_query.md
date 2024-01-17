# Parameterisation of Queries

Parameterisation, in the context of neutralising data flowing to a sink, refers to the practice of using parameters or placeholders in certain interpreted query language statements and other commands instead of directly interpolating user-supplied strings or variables to dynamically construct a query command. This technique is crucial for preventing many types of injection attacks, where an attacker can manipulate input data to execute arbitrary query statements.

When developers concatenate untrusted data directly into query language statements without proper validation or sanitisation, it creates a security vulnerability. Parameterisation helps eliminate this risk by ensuring that user inputs are treated as data and not confused for instructions.

Parameterisation is a feature supported in the language or framework libraries provided for query languages including:

- SQL
- NoSQL (MongoDB, Redis, etc.)
- HQL (Hibernate, JPA, etc.)
- GraphQL
- OQL (Object Query Language)
- DQL (Dgraph Query Language)
- Cypher (Neo4j queries)

Refer to language specific guides for details, however, following is an example of using parameterisation in the context of an SQL database operation, using Python and the SQLite database:

```python
import sqlite3

def retrieve_user_data(user_id):
    # Connect to the SQLite database
    connection = sqlite3.connect('example.db')
    cursor = connection.cursor()

    try:
        # Using parameterised query to retrieve user data
        query = "SELECT * FROM users WHERE username = ?"
        cursor.execute(query, (username,))

        # Fetch the results
        user_data = cursor.fetchone()

        # Process or return the user data as needed
        return user_data

    finally:
        # Close the database connection
        connection.close()

# Example usage
username_input = 'test;user'
result = retrieve_user_data(username_input)
print(result)
```

In this example, the SQL query statement uses a parameter marker (`?`) as a placeholder for the `user_id` value. The `execute` method of the database cursor is used to execute the query, and the actual value of `username` is passed in as a tuple `(username,)` to the database API execute function. The tuple values are bound to the parameter markers in the query string and the database engine takes care of safely handling the user input (escaping is taken care of by the underlying libraries), preventing SQL injection vulnerabilities.

By using parameterisation, the SQL engine treats the user input as data rather than executable statements, making it much more secure. This approach is not specific to SQLite or Python; similar techniques are applicable in other programming languages, database systems or query languages in general. 

Always prefer parameterised queries as a primary technique to mitigate the risk of query language injection in applications.
