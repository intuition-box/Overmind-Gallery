# TODO List for Overmind Gallery

## État du Projet - Analyse Détaillée

### ✅ Ce qui a été fait correctement :
- **Architecture technique solide** : Next.js 15, React 19, TypeScript, Tailwind CSS
- **UI/UX moderne** : shadcn/ui components, thème mystique cohérent, responsive design
- **Contrats de base** : OvermindNFT.sol et OvermindMarketplace.sol avec fonctionnalités ERC721
- **Intégration Web3** : Wagmi, RainbowKit, configuration multi-chaînes
- **Structure de hooks** : Hooks organisés pour les interactions blockchain
- **Logique GBM frontend** : Calcul des récompenses implémenté côté client
- **Pages principales** : explore, about, collections avec données mockées
- **Déploiement script** : Script Hardhat de base pour déploiement local

### ❌ Ce qui manque / n'est pas fait :
- **GBM Auction réelle** : Contrats GBM non intégrés, logique d'enchères mockée
- **Adresses de contrats** : Adresses hardcodées (placeholders) dans les hooks
- **Réseau Intuition** : Configuration manquante pour déploiement et interactions
- **Tests** : Aucun test unitaire, d'intégration ou E2E
- **Sécurité** : Vulnérabilités potentielles non adressées
- **Persistance** : Données mockées, pas de vraie blockchain interaction

### 🎯 Priorités Immédiates (Haute)

1. **Intégration GBM Auction**
   - Étudier et intégrer GBM.sol et GBMConfigurator.sol d'Aavegotchi
   - Modifier OvermindMarketplace.sol pour logique GBM (enchères, récompenses)
   - Remplacer données mockées par vraies interactions blockchain
   - Mettre à jour hooks Wagmi pour GBM bids/rewards
   - Ajouter UI notifications récompenses et incitations

2. **Sécurité et Audits**
   - Ajouter sécurités OpenZeppelin (ReentrancyGuard, validations)
   - Audit intégrations GBM et Intuition
   - Protection contre reentrancy et front-running
   - Multi-sig pour déploiements (Gnosis Safe)

3. **Logique d'Enchères Réelle**
   - Implémenter vraie logique d'enchères dans explore/page.tsx
   - Remplacer tous les placeholders par appels blockchain
   - Gestion temps réel des enchères et récompenses

### 🔄 Priorités Moyennes

4. **Intégration Réseau Intuition**
   - Configurer Hardhat pour Intuition (RPC, déploiement)
   - Lier métadonnées NFT au knowledge graph (Atoms/Triples)
   - Intégrer staking TRUST pour authenticité NFT
   - Mettre à jour wagmi config pour TRUST token

5. **Tests et Validation**
   - Tests unitaires contrats (GBM logic, rewards)
   - Tests d'intégration (flux enchères complets)
   - Tests E2E (Playwright pour user journeys)

### 🎨 Priorités Basses

6. **Améliorations UX/Fonctionnalités**
   - Persistance paramètres profil (localStorage/Intuition)
   - Améliorer loading states et thème mystique
   - Analytics tracking enchères via Intuition graph
   - Documentation complète (GBM/Intuition specs)
   - Optimisations performance (lazy loading, gas)
