from django.urls import path
from .views import AircraftList, AircraftSearch, AircraftById, AccidentsList, upload_csv, upload_accidents, process_webhook

urlpatterns = [
    path("search", AircraftSearch.as_view()),
    path("aircraft-items/", AircraftList.as_view()),
    path("accident-items/", AccidentsList.as_view()),
    path('aircrafts/<int:id>/', AircraftById.as_view()),
    path("add-user/", process_webhook, name="add-user"),
    path('upload-csv/', upload_csv, name="upload-csv"),
    path('upload-accidents/', upload_accidents, name="upload-accidents"),
]
