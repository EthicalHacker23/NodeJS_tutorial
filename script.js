function search() {
    let searchInput = document.getElementById("searchQuery").value;
    document.getElementById("h1Console").innerText = searchInput;

    window.location.href = `https://www.google.com/search?q=${searchInput}`;
}
