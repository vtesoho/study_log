// leetcode 203号问题
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
package main

func removeElements(head *ListNode, val int) *ListNode {
	if head == nil {
		return nil
	}
	res := removeElements(head.Next, val)
	if head.Val == val {
		return res
	} else {
		head.Next = res
		return head
	}

}
func main() {

}
