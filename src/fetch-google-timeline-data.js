import axios from 'axios'
import toGeoJSON from '@mapbox/togeojson'
import moment from 'moment'

function fetchGoogleTimelineData(from, to) {
  const fromDate = new Date(from)
  const toDate = new Date(to)
  const requests = []
  // eslint-disable-next-line no-unmodified-loop-condition
  for (let date = fromDate; date <= toDate; date.setDate(date.getDate() + 1)) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const uri = `https://www.google.com/maps/timeline/kml?authuser=0&pb=!1m8!1m3!1i${year}!2i${month}!3i${day}!2m3!1i${year}!2i${month}!3i${day}`
    requests.push(axios.get(uri))
  }

  console.log(`Fetching from ${from} to ${to}`)
  console.log(`${requests.length} days of Timeline data ..`)

  return new Promise((resolve, reject) => {
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          const data = {
            items: []
            }
          responses.forEach(response => {
            const kml = new DOMParser().parseFromString(response.data, 'application/xml')
            const gj = toGeoJSON.kml(kml)
            gj.features.forEach(feature => {
              const timeBegin = moment(feature.properties.timespan.begin)
              const timeEnd = moment(feature.properties.timespan.end).format("MMM Do YY")
              const duration = moment.duration(timeEnd.diff(timeBegin)).asMilliseconds()
              data.items.push({
                name: feature.properties.name,
                address: feature.properties.address,
                timeBegin: feature.properties.timespan.begin,
                timeEnd: feature.properties.timespan.end,
                duration: duration,
                category: feature.properties.Category,
              })
            })
          })

          // Remove duplicated multi-day items
          data.items = data.items.filter((e, index) => {
            const _e = JSON.stringify(e)
            return (
              index ===
              data.items.findIndex(e2 => {
                return JSON.stringify(e2) === _e
              })
            )
          })

          const fullResponse = data.items;

          function withoutPropVal(ary, propVal){
            var a = [];
            for(var i=0,l=ary.length; i<l; i++){
              var o = ary[i], g = 1;
              for(var n in o){
                if(o[n] === propVal)g = 0;
              }
              if(g)a.push(o);
            }
            return a;
          }
          data.items = withoutPropVal(data.items, "Driving" );
          
          
          function withoutPropVal(ary, propVal){
            var a = [];
            for(var i=0,l=ary.length; i<l; i++){
              var o = ary[i], g = 1;
              for(var n in o){
                if(o[n] === propVal)g = 0;
              }
              if(g)a.push(o);
            }
            return a;
          }
          data.items = withoutPropVal(data.items, "Moving" );
          console.log(data)
          // data.items = data.items.filter(function(currentObj){
          //   return items.name !== entityObj["Driving"]||  entityObj["Moving"];
          // })

          // function drive(input) {
          //   return input.name === '';
          // }

          resolve(data)
          return  {data};
        })
      )
      .catch(errors => {
        reject(errors)
      })
  })
}

export default fetchGoogleTimelineData