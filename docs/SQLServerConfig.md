# Guide to configuring SQLServer using SSMS

1. Install [SQLServer](https://www.microsoft.com/en/sql-server/sql-server-downloads) and [SSMS](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms) on your computer.

2. Open SQL Server Management Studio (aka SSMS) and access to the database using the "Windows Authentication" option.

## Configuring the "sa" login

1. In the Object Explorer(left pane), expand "Security" > "Logins" > right-click on "sa" to open its Properties.

2. In the Properties dialog, set a password. This needs to be the same as the `DB_PASSWORD` in the `.env` file.

3. In the Properties dialog and its left pane, expand the page named "Status" and set the Login to Enabled. Finally, click the Ok button.

## Enable SQL Server authentication

1. In the Object Explorer, right-click on Properties of the database server.

2. In the Properties dialog, expand the page named "Security" and set the "Server authentication" to "SQL Sever and Windows Authentication mode". Finally, click the Ok button.

## Enable TCP/IP

1. From Windows, using the search bar, type "Sql Server Configuration Manager" and open it.

2. In the left pane, expand "SQL Server Network Configuration" > "Protocols for MSSQLSERVER" > in the right pane, select "TCP/IP" and enable it. Finally, close this program.

## Restart SQL Server

1. Reopen the SSMS program and restart SQL Server. In the Object Explorer, right-click on Restart of the database server.
2. Confirm the dialog box and wait for the server to restart.

---

Now your SQL Server is ready to use.
