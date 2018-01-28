using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using TreeViewApi.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TreeViewApi.Controllers
{
    [Route("api/[controller]")]
    public class TreeViewController : Controller
    {
        private readonly TreeViewContext _context;
        private readonly List<TreeNode> defaultTreeViewState = new List<TreeNode>(
                    new TreeNode[]
                    {
                        new TreeNode("node1", "1", "2"),
                        new TreeNode("node2", "2", "3,4"),
                        new TreeNode("node3", "3"),
                        new TreeNode("node4", "4"),
                        new TreeNode("node5", "5", "6"),
                        new TreeNode("node6", "6")
                    }
                );

        public TreeViewController(TreeViewContext context)
        {
            _context = context;

            if (_context.TreeNodes.Count() == 0)
            {
                _context.TreeNodes.AddRange(defaultTreeViewState);
                _context.SaveChanges();
            }
        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<TreeNode> GetAll()
        {
            return _context.TreeNodes.ToList();
        }

        [HttpGet("{id}", Name = "GetNode")]
        public IActionResult GetById(string id)
        {
            if (id == "0")
            {
                _context.RemoveRange(_context.TreeNodes);
                _context.SaveChanges();
                _context.TreeNodes.AddRange(defaultTreeViewState);
                _context.SaveChanges();

                return new NoContentResult();
            }
            else
            {
                var foundNode = _context.TreeNodes.FirstOrDefault(n => n.Id == id);
                if (foundNode == null)
                {
                    return NotFound();
                }

                return new ObjectResult(foundNode);
            }
        }

        // POST api/<controller>
        [HttpPost]
        public IActionResult Create([FromBody]JObject data)
        {
            string nodeName = data["nodeName"].ToString();
            string parentId = data["parentId"].ToString();

            if (nodeName == null)
            {
                return BadRequest();
            }

            string id = (_context.TreeNodes.Count() + 1).ToString();
            TreeNode newNode = new TreeNode(nodeName, id);

            _context.TreeNodes.Add(newNode);
            TreeNode parentNode = _context.TreeNodes.FirstOrDefault(node => node.Id == parentId);
            if (parentNode != null)
            {
                parentNode.ChildIds += parentNode.ChildIds.Length > 0 ? "," + newNode.Id : newNode.Id;
            }

            _context.SaveChanges();

            return CreatedAtRoute("GetNode", new { id = newNode.Id }, newNode);
        }

        // PUT api/<controller>/{id}
        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody]JObject data)
        {
            string nodeName = data["nodeName"].ToString();
            if (nodeName == null)
            {
                return BadRequest();
            }

            var foundNode = _context.TreeNodes.FirstOrDefault(n => n.Id == id);
            if (foundNode == null)
            {
                return NotFound();
            }

            foundNode.Name = nodeName;

            _context.TreeNodes.Update(foundNode);
            _context.SaveChanges();
            return new NoContentResult();
        }

        // DELETE api/<controller>/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var node = _context.TreeNodes.FirstOrDefault(n => n.Id == id);
            if (node == null)
            {
                return NotFound();
            }

            node.IsRemoved = true;
            if (node.ChildIds.Any())
            {
                node.ChildIds.Split(',').ToList().ForEach(childId => Delete(childId));
            }
            _context.TreeNodes.Update(node);
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}
