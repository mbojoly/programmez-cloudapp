Bienvenue sur le repository de l'article **Démarrer dans le développement cloud** publié dans le magazine **Programmez**.

Vous y trouverez des mises à jour après la mise sous presse le code source décrit dans l'article et complété avec un test unitaire et un test d'intégration trop longs pour être décrits dans l'article. Vous trouverez aussi sur cette page des liens vers des articles complémentaires pour approfondir les termes notés en bleu dans l'article.

## ERRATA
### Nouvelle version Angular
Si vous obtenez des erreurs de ce type avec la dernière version d'Angular `Error: src/app/app.component.ts:10:3 - error TS2564: Property 'nominal' has no initializer and is not definitely assigned in the constructor.`, ajoutez une valeur par défaut à ces variables.
```
nominal: number = 0; // 4
monthsDuration: number = 0;
interestRate: number = 0;
```

### Si vous démarrez le codespace de GitHub en ayant forké mes 2 repositories
- `aws-cli` est préinstallé (par la présence du repository 'dotfiles'). Si vous suivez strictement l'article les messages suivants sont donc normaux. Vous pouvez poursuivre en utilisant le flag `--update`.
```
codespace ➜ ~/workspace/programmez-cloudapp (master ✗) $ ./aws/install -i ~/aws-cli/ -b ~/bin
Found preexisting AWS CLI installation: /home/codespace/aws-cli//v2/current. Please rerun install script with --update flag.
codespace ➜ ~/workspace/programmez-cloudapp (master ✗) $ ./aws/install -i ~/aws-cli/ -b ~/bin --update
Found same AWS CLI version: /home/codespace/aws-cli//v2/2.1.15. Skipping install.
```
- Dans le projet `infra/terraform`, ne pas oublier la commande `cdktf get` sinon cela provoque des erreurs de compilation sur `npm install` (la commande `cdktf init --template=typescript --local` s'en charge si vous suivez la totalité du déroulé).

### Nettoyage
- Pour supprimer simplement l'application créée et ne plus payer la facture AWS (quelques centimes par mois) vous pouvez utiliser cette commande et confirmer par `yes` :
```
codespace ➜ ~/workspace/programmez-cloudapp/infra/terraform (master ✗) $ cdktf destroy
```
- Après vous être déconnecté, pensez à retourner sur codespace pour supprimer définitivement du codespace et ne pas payer son stockage.

## Articles complémentaires

| **Texte**                                                    | **Lien**                                                     |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| Azure Visual Studio Codespaces                               | https://azure.microsoft.com/fr-fr/services/visual-studio-online/ |
| travis-ci                                                    | [https://Travis-ci.com](https://travis-ci.com/)              |
| Angular                                                      | https://angular.io/https://angular.io/                       |
| Azure Visual Studio Codespaces                               | https://azure.microsoft.com/fr-fr/services/visual-studio-online/ |
| AWS S3                                                       | https://aws.amazon.com/fr/s3/                                |
| mbojoly/programmez-cloudapp                                  | https://github.com/mbojoly/programmez-cloudapp               |
| mbojoly/dotfiles                                             | https://github.com/mbojoly/dotfiles                          |
| Github                                                       | https://github.com/                                          |
| Azure                                                        | https://azure.microsoft.com/fr-fr/                           |
| l'interface Azure                                            | https://online.visualstudio.com/environments/new             |
| documentation AWS                                            | https://docs.aws.amazon.com/fr_fr/IAM/latest/UserGuide/id_credentials_mfa.html |
| documentation Azure                                          | https://docs.microsoft.com/fr-fr/azure/active-directory/authentication/concept-mfa-howitworks |
| cdktf                                                        | https://learn.hashicorp.com/tutorials/terraform/cdktf        |
| ma version                                                   | https://github.com/mbojoly/visualstudio-dotfiles/blob/master/install.sh |
| mbojoly/programmez-cloudapp                                  | https://github.com/mbojoly/programmez-cloudapp               |
| Angular                                                      | https://angular.io/                                          |
| Explication de l'architecture MVC/MVVM avec Angular          | https://medium.com/@maaouikimo/why-angular-is-your-best-choice-for-you-next-projects-9d754fb18f91 |
| travis-ci                                                    | [https://Travis-ci.com](https://travis-ci.com/)              |
| clés de chiffrement                                          | https://docs.travis-ci.com/user/encryption-keys/             |
| AWS EKS                                                      | https://aws.amazon.com/fr/eks/                               |
| Google GKE                                                   | https://cloud.google.com/kubernetes-engine?hl=fr             |
| OVH Kubernetes                                               | https://www.ovhcloud.com/fr/public-cloud/kubernetes/.        |
| Express                                                      | https://expressjs.com/fr/                                    |
| Spring Boot                                                  | https://spring.io/guides/gs/spring-boot/                     |
| Atlas                                                        | https://docs.atlas.mongodb.com/reference/amazon-aws/         |
| Auth0                                                        | https://auth0.com/                                           |
| x86_64                                                       | https://en.wikichip.org/wiki/intel/microarchitectures/skylake_(server |
| ARM Neoverse                                                 | https://en.wikichip.org/wiki/arm_holdings/microarchitectures/neoverse_n1 |
| IBM Z                                                        | https://en.wikichip.org/wiki/ibm/microarchitectures/z15      |
| IBM P                                                        | https://en.wikichip.org/wiki/ibm/microarchitectures/power9   |
| SPARC                                                        | https://en.wikichip.org/wiki/fujitsu/sparc64/sparc64_xii     |
| Itanium                                                      | https://fr.wikipedia.org/wiki/Itanium                        |
| Cloud Database                                               | https://www.ovh.com/fr/cloud-databases/                      |
| Amazon DocumentDB                                            | https://aws.amazon.com/fr/documentdb/                        |
| Amazon RDS pour les bases relationnelles comme MySQL et PostgreSQ | https://aws.amazon.com/fr/rds/                               |
| Fonction As A Services                                       | https://en.wikipedia.org/wiki/Function_as_a_service          |
| OpenFaaS                                                     | https://www.openfaas.com/                                    |
| conteneurs docker                                            | https://www.docker.com/resources/what-container              |
| Kubernetes                                                   | https://kubernetes.io/fr/                                    |
| 12 Factor App                                                | https://12factor.net/fr/                                     |
| flyway                                                       | https://flywaydb.org/                                        |
| readiness state                                              | https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-application-availability-readiness-state |
| liveness state                                               | https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#boot-features-application-availability-liveness-state |
| Thierry Cruanes explique à QCon                              | https://www.infoq.com/presentations/snowflake-architecture/  |
| le chiffrement homéomorphique                                | https://www.infoq.com/news/2020/07/ibm-fhe-toolkit-linux/    |
