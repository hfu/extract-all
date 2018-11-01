const tilebelt = require('@mapbox/tilebelt')
const fs = require('fs')
const execSync = require('child_process').execSync

const z = 6

for (x = 0; x < 2 ** z; x++) {
  for (y = 0; y < 2 ** z; y++) {
    console.log(`${new Date()}: creating ${z}-${x}-${y}.pbf`)
    fs.writeFileSync('config.json', JSON.stringify({
      directory: 'dst',
      extracts: [{
        output: `${z}-${x}-${y}.pbf`,
        output_format: 'pbf',
        bbox: tilebelt.tileToBBOX([x, y, z])
      }]
    }, null, 2))
    execSync(
      `osmium extract --overwrite --config=config.json --progress ../osmium-qa/planet-181008.osm.pbf`,
      { stdio: [0, 1,2] }
    ) 
  }
}
