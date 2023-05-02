The task shall be returned within 72 hours after receiving it.
Task: You are responsible to develop a web page using following instructions.

User Story
• Schools should be shown in a table with using pagination.
• User should be able to add a new school thanks to the modal opened with the add new school button.
• User should be able to update the school that selected from the table.
• User should be able to delete the school that selected from the table.
• User should be able to add a new school to the system with excel.
• User should be able to filter the listed schools by active, passive and all status.

Technologies & Obligations
• Create git or bitbucket repo
• Should be created with create-react-app
• You must be use react js
• You must be use redux state management
• You must be use redux toolkit
• You must be use ant design ui library
• Use Sass/Scss css pre-processor
• Unit testing of generated functions is must.
• You can use attached template for excel upload.

API Endpoints
• http://167.71.77.240:5200/gateway/Account/Schools/getPagedList (SchoolList)
• http://167.71.77.240:5200/gateway/Account/Citys/getList (CitysList)
• http://167.71.77.240:5200/gateway/Account/Countys/getList (CountysList)
• http://167.71.77.240:5200/gateway/Account/InstitutionTypes/getList?PageSize=0 (SchoolTypeList)
• http://167.71.77.240:5200/gateway/Account/Schools (UpdateSchool)
• http://167.71.77.240:5200/gateway/Account/Schools?id= (DeleteSchool)
• http://167.71.77.240:5200/gateway/Account/Schools/uploadSchoolExcel (UploadExcelSchool)
• http://167.71.77.240:5200/gateway/Account/Identity/loginTry (Token)

Swagger Link
http://167.71.77.240:5200/swagger/index.html?urls.primaryName=Account%20Microservice%20-
%20v1