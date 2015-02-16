from operator import itemgetter
import json
import mcstatus

def application(environ, start_response):
    server = mcstatus.MinecraftServer.lookup('192.168.2.3:25565')
    status = server.status()
    players = [p.__dict__ for p in status.players.sample]
    output = {'players_max': status.players.max,
              'players_online': status.players.online,
              'players': sorted(players, key=itemgetter('name')),
              'version': status.version.name,
              'port': 25565,
              'hostname': 'minecraft.poisonpenllc.com',
              'online': True,
              'desc': status.description}
    result = json.dumps(output)
    response_headers = [('Content-type', 'application/json'),
                        ('Content-Length', str(len(result)))]
    start_response('200 OK', response_headers)
    return [result]
