(function (angular) {
    'use strict';

    angular
        .module('itemSetApp')
        .controller('BuildController', BuildController);

    function BuildController($q, $stateParams, staticDataService) {
        var vm = this;
        vm.summonerLevelRange = summonerLevelRange;
        //vm.addItemToBlock = addItemToBlock;
        vm.updateCount = updateCount;
        vm.addBlock = addBlock;
        vm.addItemToBlock = addItemToBlock;
        vm.blockToAddItemTo = null;
        vm.editBlock = editBlock;
        vm.removeItemFromBlock = removeItemFromBlock;
        vm.getItemById = getItemById;
        vm.itemSet = {
            'who': {
                lastEdit: new Date(),
                createdDate: new Date(),
                createdBy: {
                    userId: 1,
                    user: 'Polixo'
                }
            },
            "editable": true,
            "title": "The name of the page",
            "type": "custom",
            "map": "any",
            "mode": "any",
            "priority": false,
            "sortrank": 0,
            "blocks": [
                {
                    "type": "A block with just boots",
                    "recMath": true,
                    "minSummonerLevel": -1,
                    "maxSummonerLevel": -1,
                    "showIfSummonerSpell": "",
                    "hideIfSummonerSpell": "",
                    "items": [
                        {
                            "id": "3725",
                            "count": 1
                        },
                        {
                            "id": "3725",
                            "count": 1
                        },
                        {
                            "id": "3725",
                            "count": 1
                        }
                    ]
                }
            ]
        };
        
        staticDataService.getChampions().then(function(champions) {
            vm.championList = champions;
        });
        staticDataService.getItems().then(function(items) {
            vm.items = items;
        });
        
        if ($stateParams.edit === 'edit') {
            vm.edit = true;
        }
        
        function summonerLevelRange(block) {
            var output = '';
            if (block.minSummonerLevel === -1 && block.maxSummonerLevel === -1) {
                output = '1 - 30';
            } else if (block.minSummonerLevel === -1) {
                output = '1 - ' + block.maxSummonerLevel;
            } else if (block.maxSummonerLevel === -1) {
                output = block.minSummonerLevel + ' - 30';
            } else {
                output = block.minSummonerLevel + ' - ' + block.maxSummonerLevel;
            }
            return output;
        }
        
        // function addItemToBlock(event, dragDrop, block) {
        //     var deferred = $q.defer();

        //     if (!block.items) {
        //         block.items = [];
        //     }

        //     if (block.items.length < 6) {
        //         if (dragDrop && dragDrop.draggable && dragDrop.draggable[0] &&
        //             dragDrop.draggable[0].attributes && dragDrop.draggable[0].attributes['data-item-id'] &&
        //             dragDrop.draggable[0].attributes['data-item-id'].nodeValue) {
        //             var itemId = dragDrop.draggable[0].attributes['data-item-id'].nodeValue;
        //             block.items.push({
        //                 count: 1,
        //                 id: itemId
        //             });
        //         }
        //     }
        //     deferred.reject();
            
        //     return deferred.promise;
        // }
        
        function updateCount(item, increment) {
            if (item && item.count + increment >= 1 && item.count + increment <= 999 ) {
                item.count += increment;
            }
        }
        
        function addBlock() {
            if (vm.itemSet && !vm.itemSet.blocks) {
                vm.itemSet.blocks = [];
            }

            vm.itemSet.blocks.push({
                "type": "",
                "recMath": false,
                "minSummonerLevel": -1,
                "maxSummonerLevel": -1,
                "showIfSummonerSpell": "",
                "hideIfSummonerSpell": "",
                "items": []
            });
        }
        
        function addItemToBlock(block) {
            vm.blockToAddItemTo = block;
            vm.showItemList = true;
        }

        function editBlock(block, $event) {
            vm.blockToEdit = block;
            vm.editBlockDetails = true;
            vm.blockToEdit.distanceFromTop = angular.element($event.toElement.parentNode.parentNode.parentNode.parentNode).offset().top - 100;
        }
        
        function removeItemFromBlock(item, block) {
            var index = block.items.indexOf(item);
            if (index > -1) {
                block.items.splice(index, 1);
            }
        }
        
        function getItemById(itemId) {
            console.log(vm.items);
            for (var item in vm.items) {
                if (item.id === itemId) {
                    return item;
                }
            }
        }
    }

}(window.angular));
