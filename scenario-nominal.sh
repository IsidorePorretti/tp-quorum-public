#@IgnoreInspection BashAddShebang
truffle exec --network eleveur_hauteluce_node nominal-lait-1.js
truffle exec --network eleveur_parly_node nominal-lait-2.js
truffle exec --network eleveur_bastia_node nominal-lait-2.js
truffle exec --network laiterie_beaufort_node nominal-laiterie.js
truffle exec --network eleveur_hauteluce_node nominal-check-1.js
truffle exec --network eleveur_bastia_node nominal-check-2.js
truffle exec --network laiterie_beaufort_node nominal-dairy-production.js
