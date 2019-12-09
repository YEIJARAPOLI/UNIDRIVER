var arregloPines = [];
var infoWindow;

function cargar_mapa()
{
    var address_input = document.getElementById('search-destiny');
    var autocomplete = new google.maps.places.Autocomplete(address_input);
    infoWindow = new google.maps.InfoWindow;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          var myOptions = {
            zoom: 15,
            center: new google.maps.LatLng( pos.lat, pos.lng ),
            mapTypeId:  google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('gmap_canvas'), myOptions);

        var config = {
            map: map,
            position: pos,
            title: 'Usted está aquí', 
            animation: google.maps.Animation.DROP,
            draggable: true,
        }
        var gMarkerDV = new google.maps.Marker(config);

          map.setCenter(pos);

        }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
}

function BuscarMap()
{
    var address = document.getElementById('search-destiny').value;

    var gCoder = new google.maps.Geocoder();

    var gMarkerDV = new google.maps.Marker();

        var objInformation = {
                address: address
            }
            
            gCoder.geocode(objInformation, fn_coder);

            function fn_coder(datos){
                var coordenadas = datos[0].geometry.location;
                var configSet = {
                    map: map,
                    position: coordenadas,
                    animation: google.maps.Animation.DROP,
                    draggable: true,
                    title: 'Usted está aquí'
                }
                 gMarkerDV = new google.maps.Marker(configSet);
                var objHtml = {
                    content: '<div style="height: 180px; width: 300px"><h4><p>Destino</p></h4><p>' + address + '</p><h4>$9.500</h4><a href="#modal1" class="waves-effect waves-light btn modal-trigger">Aceptar</a><a href="index" class="waves-effect waves-light btn modal-trigger" id="CancelModal" style="margin-left: 10px;">Cancelar</a></div>'
                }
                var gWI = new google.maps.InfoWindow(objHtml);
                gWI.open(map,gMarkerDV);
                google.maps.event.addListener(gMarkerDV, 'click', function(){
                  gWI.open(map,gMarkerDV);
                });
            }

            var objConfigDR = {
                map: map,
                suppressMarkers: true
            }

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                  var posOrigin = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  };  
                  
                  var objConfigDS = {
                    origin: posOrigin,
                    destination: objInformation.address,
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.METRIC
                }
    
                var ds = new google.maps.DirectionsService(); //Obtener coordenadas
                var dr = new google.maps.DirectionsRenderer(objConfigDR); //Traduce coordenadas a la ruta
    
                ds.route(objConfigDS, fnRutear);
    
                function fnRutear(resultados, status){
                    //Muestra la ruta entre A y B
                    if(status == 'OK')
                    {
                        dr.setDirections(resultados);
                    }
                    else
                    {
                        alert('Erorr ' + status);
                    }
                }
                  
                }, function() {
                  handleLocationError(true, infoWindow, map.getCenter());
                });
              } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
              }
}

  //jQuery
  $(document).ready(function(){
    $('.collapsible').collapsible();
  });
