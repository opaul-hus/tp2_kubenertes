#!/bin/bash

# Supprimer tous les éléments Kubernetes
# Ex. pods, services, deployments, configmaps, secrets, persistentvolumes, persistentvolumeclaims, etc.

# Arrêter tous les conteneurs Docker, s'il y en a (ne doit pas crasher)

# Supprimer toutes les éléments Docker sans demande de confirmation
# Ex. images, conteneurs, volumes, réseaux, etc.

# Créer les images Docker à partir du fichier compose.yaml

# Créer les dossiers pour les volumes des DB transactions et users
# Note : écrire sur le C demande les droits administrateurs
# Chemins dans Windows :
# - C:/volumes/<matricule>/transactions
# - C:/volumes/<matricule>/users

# Lancer le fichier de déploiement Kubernetes