from database import fetch_data

def fetch_cameras(config):
    cameras = fetch_data(config, 'SELECT c.*, l.floor_number FROM cameras c JOIN locations l ON c.location_id = l.id')
    return cameras