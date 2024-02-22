# Book Bans In The US 


### Project Overview

Our project delved into an analysis of banned books within the United States educational system, aiming to shed light on the concerning trend of book bans in public schools. Drawing from data provided by PEN America's Index of School Book Bans, covering bans from July 2021 to March 2022, we explored the scope and implications of book censorship in educational settings. Utilizing data visualization tools such as JavaScript, Leaflet, and heatmaps, we aimed to offer a comprehensive understanding of the phenomenon.

### Key Findings and Insights

Our analysis revealed alarming trends in the prevalence and nature of book bans across various school districts in the United States. Over the nine-month period covered, a total of 1,586 instances of individual books being banned were recorded, affecting 1,145 unique book titles. These bans manifested in different forms, including removals from school libraries, prohibitions in classrooms, and restrictions during investigations prompted by challenges from parents, educators, administrators, or lawmakers. Particularly troubling was the finding that the vast majority of bans (98%) deviated from established best practice guidelines designed to protect students' First Amendment rights. Additionally, the data showcased a disproportionate targeting of books by or about marginalized communities, including people of color, LGBTQ+ individuals, and persons with disabilities, underscoring concerns about censorship and representation in school curricula. Through our visualization efforts, we aimed to amplify awareness of these trends and advocate for the preservation of free expression and access to diverse literature in educational environments.


### Installation

Follow the steps below to access our Book Ban Webpage

1. Begin by ensuring all dependencies related to Flask are installed as our data analysis relies on this framework.
2. Clone the repository containing the necessary files.
3. Using your terminal, navigate to the main directory of the cloned repository.
4. Execute the command 'python base.py' in your terminal to initiate the Flask application.
5. Launch your a chrome web browser and enter the appropriate URL to display the available API routes.
6. To access our home page, append /index to the browser's URL and navigate accordingly.
7. Happy browsing!!

### Database

Our raw data originated from an Excel (.xlsx) file. We opted for SQLite as our database, which provides structured data management, efficient querying, scalability, and data integrity. These advantages streamline data storage, management, and analysis, while also ensuring consistency, security, and reliability compared to the original .xlsx file.

### Ethical Considerations

Transparency regarding the criteria and motivations behind book bans is crucial for fostering informed debate and safeguarding intellectual freedom. Additionally, ethical frameworks should prioritize the promotion of diversity and inclusion, recognizing that censorship disproportionately impacts marginalized voices and perpetuates systemic biases. Ultimately, any analysis of book ban data must be guided by a commitment to upholding democratic principles and protecting the rights of all individuals to engage with a wide range of ideas and perspectives.

### Extract / Transform / Load Workflow

##### JSON / SQLite ETL Workflow:

1. Import necessary dependencies
2. Establish a path for the raw .xlsx file
3. Create an initial dataframe and inspect data types
4. Remove null values and unnecessary columns
5. Standardize column names using snake case
6. Export the processed data to a JSON file
7. Store the processed data in a SQLite database

##### District Data ETL Workflow using GeoApify:

1. Import required dependencies
2. Utilize GeoApify to access geographical data
3. Iterate through the dataframe to extract district information
4. Append GeoApify URL with district names to retrieve specific data
5. Retrieve coordinates (latitude and longitude) for each district
6. Add latitude and longitude columns to the dataframe
7. Export the processed data to a JSON file

### References
Data Reference:

1. [Pen America: A Freedom To Write](https://pen.org/banned-in-the-usa/#what)

Template References: 
1. [GymFit](https://demo.themefisher.com/gymfit/).

2. [Leaflet](https://leafletjs.com/examples/choropleth/)

3. [Donut Chart](https://apexcharts.com/docs/chart-types/pie-donut/#general)

4. [Plotly Bar Chart](https://plotly.com/javascript/bar-charts/)

Code Assistance: 
    
1. [ChatGPT](https://chat.openai.com/) 

2. EdX Instructors

### Credit
Code written by group members Seren Frazin, Pete Kline, Hok Yin Cheung, and Pallavi Deshmukh. 
