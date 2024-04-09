function search(){
    let searchInput = document.getElementById("searchQuery").value;
    window.location.href = `https://www.google.com/search?q=${searchInput}`;
}

function setText(id, newText){
    console.log(newText);
    document.getElementById(id).innerText = newText;
}

function generateFakePerson(){
    let img = document.getElementById("FakePersonIMG_ID");
    img.src = "https://thispersondoesnotexist.com/";
}

function spotify(){
    const client_id = '404c50b649664751b9601bc8cae7ed79';
    const client_secret = 'a6ff12b117ea4a34a9ccd9c07fc4aded';
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
    };

    const endpoint_spotify = "https://accounts.spotify.com/api/token";

    fetch(endpoint_spotify, requestOptions).then(function(res){
        if (!res.ok){ throw new Error('Error al obtener el token de acceso'); }
        return res.json();
    }).then(function(j){
        const token = j.access_token;

            let artistName = document.getElementById("input-artist").value;
            const endpoint_search = `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`;
            
            const searchOptions = {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            };

            return fetch(endpoint_search, searchOptions).then(function(response){
                if (!response.ok) {
                    throw new Error('Error al realizar la búsqueda de artistas');
                }
                return response.json();
            }).then(function(artistData){
                const artistas = artistData.artists.items;
                if (artistas.length > 0) {
                    const primerArtista = artistas[0];
                    const artistId = primerArtista.id;

                    const artistEndpoint = `https://api.spotify.com/v1/artists/${artistId}`;
                    const artistOptions = {
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    };

                    return fetch(artistEndpoint, artistOptions).then(function(response){
                        if (!response.ok){ throw new Error('Error al obtener información del artista'); }
                        return response.json();
                    }).then(function(artistData){
                        document.getElementById("artist-name").textContent = artistData.name;
                        document.getElementById("artist-genres").textContent = "Géneros relacionados: " + artistData.genres.join(', ');
                        document.getElementById("artist-followers").textContent = "Seguidores: " + artistData.followers.total.toLocaleString('en-US');
                        document.getElementById("artist-img").setAttribute("src", artistData.images[0].url);
                        recommendation(artistData.name, artistData.genres);
                    });
                }
                
                else{ throw new Error('No se encontraron artistas con ese nombre.'); }
            });
        }).catch(function(error){ console.log("Error:", error);
    });
}


