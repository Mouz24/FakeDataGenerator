#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["FakeDataGenerator/FakeDataGenerator.csproj", "FakeDataGenerator/"]
RUN dotnet restore "FakeDataGenerator/FakeDataGenerator.csproj"
COPY . .
WORKDIR "/src/FakeDataGenerator"
RUN dotnet build "FakeDataGenerator.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FakeDataGenerator.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY ["Resources", "Resources"]
ENTRYPOINT ["dotnet", "FakeDataGenerator.dll"]