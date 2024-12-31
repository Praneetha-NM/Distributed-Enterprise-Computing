from flask import Flask, render_template, request, redirect
from models import get_events, get_event, book_ticket, add_event, get_ticket_count

app = Flask(__name__)

@app.context_processor
def utility_processor():
    return dict(get_ticket_count=get_ticket_count)

@app.route('/')
def index():
    events = get_events()
    return render_template('index.html', events=events)

@app.route('/event/<int:event_id>')
def show(event_id):
    event = get_event(event_id)
    ticket_count = get_ticket_count(event_id)
    return render_template('show.html', event=event, ticket_count=ticket_count)

@app.route('/book/<int:event_id>', methods=['GET', 'POST'])
def book(event_id):
    if request.method == 'POST':
        no_of_seats = request.form['no_of_seats']
        book_ticket(event_id, no_of_seats)
        return redirect('/')
    return render_template('book_ticket.html', event_id=event_id)

@app.route('/add_event', methods=['GET', 'POST'])
def add_event_route():
    if request.method == 'POST':
        name = request.form['name']
        start_time = request.form['start_time']
        end_time = request.form['end_time']
        organizer = request.form['organizer']
        add_event(name, start_time, end_time, organizer)
        return redirect('/')
    return render_template('add_event.html')

if __name__ == '__main__':
    app.run(debug=True, port=3000)