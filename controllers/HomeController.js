export function GetHome(req, res) {
    res.render('home/home', {"page-title": 'Home'});
}