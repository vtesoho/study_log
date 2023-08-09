package main

import "fmt"

type TrieNode struct {
	children map[rune]*TrieNode
	isEnd    bool
}

type Trie struct {
	root *TrieNode
}

func NewTrie() *Trie {
	return &Trie{
		root: &TrieNode{
			children: make(map[rune]*TrieNode),
			isEnd:    false,
		},
	}
}

func (t *Trie) Insert(word string) {
	node := t.root
	for _, char := range word {
		if _, exists := node.children[char]; !exists {
			node.children[char] = &TrieNode{
				children: make(map[rune]*TrieNode),
				isEnd:    false,
			}
		}
		node = node.children[char]
	}
	node.isEnd = true
}

func (t *Trie) Search(word string) bool {
	node := t.root
	for _, char := range word {
		if _, exists := node.children[char]; !exists {
			return false
		}
		node = node.children[char]
	}
	return node.isEnd
}

func (t *Trie) StartsWith(prefix string) bool {
	node := t.root
	for _, char := range prefix {
		if _, exists := node.children[char]; !exists {
			return false
		}
		node = node.children[char]
	}
	return true
}

func main() {
	trie := NewTrie()
	trie.Insert("apple")
	trie.Insert("app")
	trie.Insert("banana")

	fmt.Println(trie.Search("apple"))  // true
	fmt.Println(trie.Search("app"))    // true
	fmt.Println(trie.Search("banana")) // true
	fmt.Println(trie.Search("grape"))  // false

	fmt.Println(trie.StartsWith("app")) // true
	fmt.Println(trie.StartsWith("ban")) // true
	fmt.Println(trie.StartsWith("gr"))  // false
}
