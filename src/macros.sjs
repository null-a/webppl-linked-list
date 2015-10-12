operator (::) 3 right { $val, $list } => #{ $[$cons]($val, $list) }
macro (<>) { rule {} => { EmptyList } }
export (::)
export (<>)
