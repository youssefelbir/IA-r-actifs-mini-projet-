# Simulation de Boids avec Prédateur - Requin

Cette simulation modélise un système de comportement de type **flocking** (regroupement d'agents), où des entités appelées *boids* se déplacent dans un espace selon des règles simples mais réalistes. Un prédateur, le **requin**, poursuit les boids et les "mange" lorsqu'il les attrape. Les boids ne fuient pas activement le requin mais sont vulnérables lorsqu'ils croisent sa trajectoire.

[Essayez la simulation ici !](https://youssefelbir.github.io/IA-r-actifs-mini-projet-/)

---

## Fonctionnalités

### Comportements des Boids
- **Séparation** : Empêche les boids de se regrouper trop étroitement en les éloignant les uns des autres.
- **Cohésion** : Encourage les boids à se rapprocher du centre du groupe voisin.
- **Alignement** : Les boids s'alignent avec la direction moyenne des boids voisins.

### Comportement cible
- **Chercher une cible** : Un boid peut se diriger vers une position cible spécifique.
- **Fuir une cible** : Un boid peut s'éloigner activement d'une position cible (comme un prédateur).

### Comportement de leader
- **Suivre un leader** : Les boids peuvent suivre le **requin** à une certaine distance. Lorsque ce comportement est activé (`touche 'f'`), les boids ajustent leur trajectoire pour rester proches mais sans trop se rapprocher.

### Comportement de déviation
- **Errer** : Les boids adoptent un comportement aléatoire, simulant une exploration naturelle de l'espace.

### Gestion des frontières
- Les boids rebondissent lorsqu'ils atteignent les bords de la zone d'affichage pour rester dans une zone rectangulaire.

### Éviter les obstacles
- Les boids détectent et ajustent leur trajectoire pour éviter les obstacles. Ces derniers sont mobiles et se déplacent dans l'espace.

### Prédateur - Requin
- Le **requin** poursuit activement les boids. Lorsqu'il attrape un boid, celui-ci est "mangé" et disparaît de la simulation.
- Les boids ne fuient pas activement le requin, augmentant leur vulnérabilité lorsqu'ils croisent sa trajectoire.

---

## Interactivité

### Commandes disponibles
- **Démarrer et arrêter la simulation :**
  - Appuyez sur la touche **'s'** pour démarrer la simulation.
  - Appuyez sur la touche **'o'** pour arrêter la simulation.
  
- **Activer/désactiver le suivi du requin par les boids :**
  - Appuyez sur la touche **'f'** pour activer ou désactiver ce comportement.

- **Modifier la taille des boids :**
  - Appuyez sur la touche **'r'** pour ajuster la taille des boids de manière aléatoire.

- **Afficher/cacher le mode debug :**
  - Appuyez sur la touche **'d'** pour activer ou désactiver l'affichage des informations de débogage.

- **Supprimer le requin :**
  - Appuyez sur la touche **'t'** pour activer ou désactiver la présence du requin dans la simulation.

---

## Prérequis

- **p5.js** : Une bibliothèque JavaScript utilisée pour créer des animations interactives.  
  Vous pouvez télécharger la bibliothèque depuis [p5.js](https://p5js.org/).

---

## Installation

1. Clonez ce repository :
   ```bash
   git clone https://github.com/youssefelbir/IA-r-actifs-mini-projet-.git
