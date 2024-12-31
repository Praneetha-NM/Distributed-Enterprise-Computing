import sqlite3

def get_db_connection():
    conn = sqlite3.connect('ticket_booking.db')
    conn.row_factory = sqlite3.Row
    return conn

def get_events():
    conn = get_db_connection()
    events = conn.execute('SELECT * FROM stage_event').fetchall()
    conn.close()
    return events

def get_event(event_id):
    conn = get_db_connection()
    event = conn.execute('SELECT * FROM stage_event WHERE id = ?', (event_id,)).fetchone()
    conn.close()
    return event

def book_ticket(event_id, no_of_seats):
    conn = get_db_connection()
    conn.execute('INSERT INTO ticket_booking (event_id, no_of_seats) VALUES (?, ?)', (event_id, no_of_seats))
    conn.commit()
    conn.close()

def add_event(name, start_time, end_time, organizer):
    conn = get_db_connection()
    conn.execute('INSERT INTO stage_event (name, start_time, end_time, organizer) VALUES (?, ?, ?, ?)',
                 (name, start_time, end_time, organizer))
    conn.commit()
    conn.close()

def get_ticket_count(event_id):
    conn = get_db_connection()
    count = conn.execute('SELECT SUM(no_of_seats) FROM ticket_booking WHERE event_id = ?', (event_id,)).fetchone()[0]
    conn.close()
    return count if count is not None else 0