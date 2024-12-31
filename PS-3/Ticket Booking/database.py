import sqlite3

def init_db():
    conn = sqlite3.connect('ticket_booking.db')
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS stage_event (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(45),
            start_time DATETIME,
            end_time DATETIME,
            organizer VARCHAR(45)
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS ticket_booking (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            event_id INTEGER,
            no_of_seats DOUBLE,
            FOREIGN KEY(event_id) REFERENCES stage_event(id)
        )
    ''')
    
    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()