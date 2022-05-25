import configparser


def init_config():
    configParser = configparser.RawConfigParser()
    configPath = r'./config/config.cfg'
    configParser.read(configPath)

    return configParser
