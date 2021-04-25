export const displaymap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidGhhcm1hIiwiYSI6ImNrbnNuZm1majEwMDcyb3F3aWhweTl3NGgifQ.V-7Fy_9TRM6Hn6mshKQ3tA'
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/tharma/cknsoax7j0ipt18muid7ozbd0',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 1,
    // interactive:false
  })

  const bounds = new mapboxgl.LngLatBounds()

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div')
    el.className = 'marker'

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map)

    // Add popup

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map)

    // Extends map bounds to include current location
    bounds.extend(loc.coordinates)
  })

  map.fitBounds(bounds, {
    padding: {
      top: 150,
      bottom: 125,
      left: 100,
      right: 100,
    },
  })
}
