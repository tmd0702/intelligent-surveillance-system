import psycopg2
from psycopg2 import sql
from contextlib import contextmanager

def create_connection(config):
    connection = psycopg2.connect(
        dbname=config['postgres']['database'],
        user=config['postgres']['user'],
        password=config['postgres']['password'],
        host=config['postgres']['host'],
        port=config['postgres']['port']
    )
    return connection

@contextmanager
def get_cursor(config):
    conn = create_connection(config)
    try:
        yield conn.cursor()
        conn.commit()
    except Exception as e:
        conn.rollback()
        print(f"An error occurred: {e}")
    finally:
        conn.close()

def execute_query(config, query, params=None):
    with get_cursor(config) as cursor:
        cursor.execute(query, params)

def fetch_data(config, query, params=None):
    with get_cursor(config) as cursor:
        cursor.execute(query, params)
        return cursor.fetchall()

def insert_data(config, table, data):
    columns = data.keys()
    values = data.values()

    query = sql.SQL("INSERT INTO {table} ({fields}) VALUES ({values})").format(
        table=sql.Identifier(table),
        fields=sql.SQL(',').join(map(sql.Identifier, columns)),
        values=sql.SQL(',').join(sql.Placeholder() * len(values))
    )

    execute_query(config, query, tuple(values))

def update_data(config, table, data, condition):
    set_clause = ", ".join([f"{key} = %s" for key in data.keys()])
    condition_clause = " AND ".join([f"{key} = %s" for key in condition.keys()])

    query = f"UPDATE {table} SET {set_clause} WHERE {condition_clause}"

    execute_query(config, query, tuple(data.values()) + tuple(condition.values()))
