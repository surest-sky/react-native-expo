let data =
  '[{"config":"172.18.100.1/00:00:00:00:00:00/h3c/ywj3344;172.18.5.254/00:00:00:00:00:00/h3c/ywj3344","snmp_version":"2","vseip":"2886860920","vsename":"172.18.0.120"},{"config":"172.18.100.2/00:00:00:00:00:00/maipu/public888","snmp_version":"2","vseip":"2886860925","vsename":"172.18.0.125"},{"config":"172.18.1.254/00:00:00:00:00:00/h3c/ywj3344","snmp_version":"2","vseip":"2886860926","vsename":"172.18.0.126"}]\n';
data = JSON.parse(data);
let configs = [];
let list = [];

data.forEach((snmp_server) => {
  let configs = snmp_server.config.split(";");
  configs.forEach((config) => {
    const item = config.split("/");
    list.push({
      ip: item[0],
      brand: item[2],
      name: item[3],
      snmp_version: snmp_server.snmp_version,
      vseip: snmp_server.vseip,
      vsename: snmp_server.vsename,
    });
  });
});

console.log("table list", list);

let items = [];
let ids = list.map((v) => v.vseip);
ids = Array.from(new Set(ids));

ids.forEach((id) => {
  let config = [];
  let findItem = {};
  list.forEach((v) => {
    if (v.vseip == id) {
      config.push(`${v.ip}/${v.brand}/${v.name}`);
      findItem = v;
    }
  });
  config = config.join(";");
  let item = {
    config: config,
    snmp_version: findItem.snmp_version,
    vseip: findItem.vseip,
    vsename: findItem.vsename,
  };
  items.push(item);
});

console.log("save", items);
