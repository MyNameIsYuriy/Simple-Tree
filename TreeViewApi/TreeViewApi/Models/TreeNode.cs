using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TreeViewApi.Models
{
    public class TreeNode
    {
        public string Name { get; set; }
        public string Id { get; set; }
        public bool IsRemoved { get; set; } = false;
        public string ChildIds { get; set; }
        
        public TreeNode() { }

        public TreeNode(string name, string id, string childIds = "")
        {
            Name = name;
            Id = id;
            ChildIds = childIds;
        }
    }
}
