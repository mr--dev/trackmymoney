TrackMyMoney
============

TrackMyMoney is a simple web application for managing personal outgoings, developed with Tornado.  
I decided to make public this old project of mine: it was one of my first steps in writing web application using Python as backend programming language.

In this project I have used:
* [Cosmo](http://bootswatch.com/cosmo/): free theme built with [Bootstrap](http://bootstrapdocs.com/v2.2.2/docs/)
* [jQuery](http://jquery.com/download/)
* [jqPlot](http://www.jqplot.com/) for plotting graphs
* [jQuery Validation Plugin](http://jqueryvalidation.org/) for validating forms
* [Bootbox](http://bootboxjs.com/) for a unified style with dialog boxes.
* MySQL

Installation and Configuration
------------------------------

Tornado can be installed with `pip` or `easy_install`:  

    pip install tornado  
    
Create a MySQL database, database user and password and import generic dump:  
    
    mysql -u user -ppassword database < trackmymoney.db.sql  

Apply correct configuration in `config.py` and launch the server with command:

    python main.py
    
Open your browser at `http://localhost:port` and access with (admin, admin).  
Password are stored clear. If you want to change then you can manually edit `trackmymoney.db.sql`
