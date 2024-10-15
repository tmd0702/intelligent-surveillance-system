import yaml

def read_config(path="config/config.yaml"):
    with open(path) as f:
        cfg = yaml.load(f, Loader=yaml.FullLoader)
        return cfg