const tilebelt = require('@mapbox/tilebelt')
const fs = require('fs')
const execSync = require('child_process').execSync

const z = 4

for (x = 0; x < 2 ** z; x++) {
  for (y = 0; y < 2 ** z; y++) {
    console.log(`${new Date()}: creating ${z}-${x}-${y}.pbf`)
    let bbox = tilebelt.tileToBBOX([x, y, z])
    const buffer = (bbox[2] - bbox[1]) * 5 / 256
    bbox = [bbox[0] - buffer, bbox[1] - buffer, 
      bbox[2] + buffer, bbox[3] + buffer]
    fs.writeFileSync('config.json', JSON.stringify({
      directory: '/Volumes/Extreme 900/welt/dst',
      extracts: [{
        output: `${z}-${x}-${y}.pbf`,
        output_format: 'pbf',
        bbox: bbox
      }]
    }, null, 2))
    execSync(
      `osmium extract --overwrite --config=config.json --progress /Volumes/Extreme\\ 900/welt/planet-190107.osm.pbf`,
      { stdio: [0, 1, 2] }
    ) 
  }
}
