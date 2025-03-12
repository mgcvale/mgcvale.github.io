const upnp = require('nat-upnp');
const client = upnp.createClient();

const PORT = 8000

client.portMapping(
  {
    public: PORT,
    private: PORT,
    ttl: 90000,
  },
  (err) => {
    if (err) {
      console.error('Failed to enable port forwarding:', err);
    } else {
      console.log(`Port forwarding enabled on port ${PORT}`);
    }
  }
);
